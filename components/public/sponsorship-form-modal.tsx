"use client";

import { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DEFAULT_FORM_DATA,
  sponsorBioSchema,
  locationSchema,
  donationSchema,
  paymentSchema,
  paymentMethodSchema,
  zellePaymentSchema,
  checkPaymentSchema,
  achPaymentSchema,
  SponsorshipFormData,
  SponsorData,
  LocationData,
  DonationData,
  PaymentData,
  PaymentMethodData,
} from "@/lib/sponsorship-form-types";
import type { SponsorshipProfile } from "@/lib/mock-data";
import { saveSponsorshipSubmission } from "@/lib/sponsorship-storage";
import SponsorshipFormHeader from "./sponsorship-form-header";
import Step1SponsorBio from "./sponsorship-form-steps/step-1-sponsor-bio";
import Step2Location from "./sponsorship-form-steps/step-2-location";
import Step3Donation from "./sponsorship-form-steps/step-3-donation";
import Step4PaymentMethod from "./sponsorship-form-steps/step-4-payment-method";
import Step5PaymentDetails from "./sponsorship-form-steps/step-5-payment-details";
import SponsorshipSuccessModal from "./sponsorship-success-modal";
import { apiRequest } from "@/lib/query-client";

interface SponsorshipFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  childProfile: SponsorshipProfile;
}

interface FormErrors {
  sponsor: Partial<Record<keyof SponsorData, string>>;
  location: Partial<Record<keyof LocationData, string>>;
  donation: Partial<Record<keyof DonationData, string>>;
  paymentMethod: Partial<Record<keyof PaymentMethodData, string>>;
  payment: Partial<Record<string, string>>;
}

export default function SponsorshipFormModal({
  isOpen,
  onClose,
  childProfile,
}: SponsorshipFormModalProps) {
  const closeButtonRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] =
    useState<SponsorshipFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({
    sponsor: {},
    location: {},
    donation: {},
    paymentMethod: {},
    payment: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);

  const getDefaultMailingAddress = () => {
    return [
      formData.location.address,
      formData.location.city,
      formData.location.state,
      formData.location.zip,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: FormErrors = {
        sponsor: {},
        location: {},
        donation: {},
        paymentMethod: {},
        payment: {},
      };

      try {
        if (step === 1) {
          sponsorBioSchema.parse(formData.sponsor);
        } else if (step === 2) {
          locationSchema.parse(formData.location);
        } else if (step === 3) {
          donationSchema.parse(formData.donation);
        } else if (step === 4) {
          paymentMethodSchema.parse(formData.paymentMethod);
        } else if (step === 5) {
          const method = formData.paymentMethod.paymentMethod;
          if (method === "card") {
            paymentSchema.parse(formData.payment);
          } else if (method === "zelle") {
            zellePaymentSchema.parse(formData.payment);
          } else if (method === "check") {
            checkPaymentSchema.parse(formData.payment);
          } else if (method === "ach") {
            achPaymentSchema.parse(formData.payment);
          }
        }
        setErrors(newErrors);
        return true;
      } catch (error: any) {
        if (error.errors) {
          error.errors.forEach((err: any) => {
            const field = err.path[0] as string;
            let stepKey: keyof FormErrors;
            if (step === 1) stepKey = "sponsor";
            else if (step === 2) stepKey = "location";
            else if (step === 3) stepKey = "donation";
            else if (step === 4) stepKey = "paymentMethod";
            else stepKey = "payment";
            (newErrors[stepKey] as any)[field] = err.message;
          });
        }
        setErrors(newErrors);
        return false;
      }
    },
    [formData],
  );

  const handleNextStep = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === 4) {
      setFormData((prev) => {
        const nextPayment = { ...prev.payment };
        const method = prev.paymentMethod.paymentMethod;

        if (method === "zelle") {
          nextPayment.zelleName =
            nextPayment.zelleName || prev.sponsor.name || "";
          nextPayment.zellePhone =
            nextPayment.zellePhone || prev.sponsor.phone || "";
        } else if (method === "check") {
          nextPayment.checkEmail =
            nextPayment.checkEmail || prev.sponsor.email || "";
          nextPayment.checkAddress =
            nextPayment.checkAddress ||
            [
              prev.location.address,
              prev.location.city,
              prev.location.state,
              prev.location.zip,
            ]
              .filter(Boolean)
              .join(", ") ||
            "";
        } else if (method === "ach") {
          nextPayment.achContactPhone =
            nextPayment.achContactPhone || prev.sponsor.phone || "";
          nextPayment.achContactEmail =
            nextPayment.achContactEmail || prev.sponsor.email || "";
        }

        return {
          ...prev,
          payment: nextPayment,
        };
      });
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const payload = {
        sponsor: formData.sponsor as SponsorData,
        location: formData.location as LocationData,
        donation: formData.donation as DonationData,
        paymentMethod: formData.paymentMethod as PaymentMethodData,
        childId: childProfile._id,
      };

      await apiRequest("POST", `/sponsors/profile/new`, payload);

      setShowSuccess(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setCurrentStep(1);
        setFormData(DEFAULT_FORM_DATA);
      }, 5000);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit sponsorship. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormDataChange = (
    stepKey: keyof SponsorshipFormData,
    data: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data },
    }));
    // Clear errors for this step when user makes changes
    setErrors((prev) => ({
      ...prev,
      [stepKey]: {},
    }));
  };

  if (showSuccess && submissionData) {
    return (
      <SponsorshipSuccessModal
        isOpen={showSuccess}
        submissionData={submissionData}
        childProfile={childProfile}
      />
    );
  }

  return (
    <Dialog
      open={isOpen && !showSuccess}
      onOpenChange={(open) => {
        if (!open && closeButtonRef.current) {
          closeButtonRef.current = false;
          onClose();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] w-full max-w-2xl bg-card overflow-y-auto p-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8"
        >
          {/* Header with Close Button */}
          <div className="relative">
            <SponsorshipFormHeader
              currentStep={currentStep}
              totalSteps={5}
              childName={childProfile.firstName}
              childImage={childProfile.image.url}
            />
            <button
              onClick={() => {
                closeButtonRef.current = true;
                onClose();
              }}
              className="absolute -top-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/70 ring-offset-background transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Steps */}
          <div className="mt-8 min-h-96">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step1SponsorBio
                    data={formData.sponsor}
                    onChange={(data) => handleFormDataChange("sponsor", data)}
                    errors={errors.sponsor}
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step2Location
                    data={formData.location}
                    onChange={(data: any) =>
                      handleFormDataChange("location", data)
                    }
                    errors={errors.location}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step3Donation
                    data={formData.donation}
                    onChange={(data) => handleFormDataChange("donation", data)}
                    errors={errors.donation}
                  />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step4PaymentMethod
                    data={formData.paymentMethod}
                    onChange={(data) =>
                      handleFormDataChange("paymentMethod", data)
                    }
                    errors={errors.paymentMethod}
                  />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step5PaymentDetails
                    paymentMethod={formData.paymentMethod.paymentMethod || ""}
                    donationAmount={formData.donation.amount || 0}
                    donationPeriod={formData.donation.period || "Monthly"}
                    defaultName={formData.sponsor.name || ""}
                    defaultEmail={formData.sponsor.email || ""}
                    defaultPhone={formData.sponsor.phone || ""}
                    defaultAddress={getDefaultMailingAddress()}
                    data={formData.payment}
                    onChange={(data) => handleFormDataChange("payment", data)}
                    errors={errors.payment}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-3 border-t border-border pt-6">
            <motion.div
              whileHover={currentStep > 1 ? { x: -4 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="rounded-full gap-2"
              >
                <ArrowLeft size={16} /> Back
              </Button>
            </motion.div>

            <div className="flex-1" />

            <motion.div
              whileHover={currentStep < 5 ? { scale: 1.02 } : {}}
              whileTap={currentStep < 5 ? { scale: 0.98 } : {}}
            >
              <Button
                type="button"
                onClick={currentStep < 5 ? handleNextStep : handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-primary px-8 font-semibold text-white hover:bg-green-700"
              >
                {isSubmitting
                  ? "Processing..."
                  : currentStep === 5
                    ? "Complete Sponsorship"
                    : "Next"}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
