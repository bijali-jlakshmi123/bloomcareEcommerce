import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold font-display mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Have questions about our products, orders, or need support? We&apos;d love
          to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:support@bloomcare.com"
                  className="text-rose-500 hover:underline"
                >
                  support@bloomcare.com
                </a>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a
                  href="tel:+911234567890"
                  className="text-rose-500 hover:underline"
                >
                  +91 123 456 7890
                </a>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Wellness Street,
                  <br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Mon - Fri: 9AM - 6PM
                  <br />
                  Sat: 10AM - 4PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
