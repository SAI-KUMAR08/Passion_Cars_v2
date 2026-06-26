"use client";

import { useState } from "react";
import { Save, Phone, MessageCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { useToast } from "@/components/Toast";

export default function AdminSettingsPage() {
  const { settings, updatePhone, updateWhatsapp } = useSettings();
  const { toast } = useToast();
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);

  const handleSavePhone = () => {
    updatePhone(phone);
    toast("Phone number updated successfully");
  };

  const handleSaveWhatsapp = () => {
    updateWhatsapp(whatsapp);
    toast("WhatsApp number updated successfully");
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your business information</p>
      </div>

      <div className="space-y-6">
        {/* Phone */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-1">
            <Phone className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold text-gray-900">Phone Number</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Phone number displayed across the website</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field flex-1"
              placeholder="+91 99999 88888"
            />
            <button onClick={handleSavePhone} className="btn-primary py-2.5 px-5 text-sm">
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-1">
            <MessageCircle className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">WhatsApp Number</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">WhatsApp number (with country code, no +)</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="input-field flex-1"
              placeholder="919999988888"
            />
            <button onClick={handleSaveWhatsapp} className="btn-primary py-2.5 px-5 text-sm">
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
