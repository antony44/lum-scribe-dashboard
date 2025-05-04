
import { User } from "@supabase/supabase-js";
import { useUserProfile } from './order/useUserProfile';
import { useOrderFormState } from './order/useOrderFormState';
import { submitOrder } from './order/useSubmitOrder';
import { UseOrderFormResult } from './order/types';

export { OrderFormData, ClientData, UseOrderFormResult } from './order/types';

export function useOrderForm(user: User | null): UseOrderFormResult {
  const {
    formData,
    setFormData,
    isLoading,
    setIsLoading,
    isSubmitting,
    setIsSubmitting
  } = useOrderFormState();

  // Load user data on component mount
  useUserProfile(user, { setFormData, setIsLoading });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    return submitOrder(e, { 
      user, 
      formData, 
      formState: { setFormData, setIsSubmitting }
    });
  };

  return {
    formData,
    setFormData,
    isLoading,
    isSubmitting,
    handleSubmit,
    user
  };
}
