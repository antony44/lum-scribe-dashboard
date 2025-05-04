
import { useState } from 'react';
import { FormValues } from './types';
import { useForm } from 'react-hook-form';

// Webhook URL par défaut
const DEFAULT_WEBHOOK_URL = "https://hook.eu2.make.com/abcdefg123456789";

export const useOrderFormState = (showWebhookSettings = false) => {
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [internalLinks, setInternalLinks] = useState<{title: string, url: string}[]>([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [showWebhookConfigPanel, setShowWebhookConfigPanel] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_WEBHOOK_URL);
  
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      website: "",
      category: "",
      companyContext: "",
      objective: "",
      topic: "",
      tones: [],
      contentType: "in_depth",
      authority: "medium",
      internalLinks: [],
      bannedTopics: "",
      useEmojis: "no",
      useHtml: false,
      htmlType: "embed",
      confirmed: false,
      otherObjective: "",
      webhookUrl: DEFAULT_WEBHOOK_URL,
    }
  });

  return {
    form,
    submitting,
    setSubmitting,
    generating,
    setGenerating,
    internalLinks,
    setInternalLinks,
    newLink,
    setNewLink,
    showWebhookConfigPanel,
    setShowWebhookConfigPanel,
    webhookUrl,
    setWebhookUrl,
    DEFAULT_WEBHOOK_URL
  };
};
