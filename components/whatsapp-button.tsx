import Image from "next/image";
import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <Link href={"https://wa.me/917007586561"} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full">
      <Image
      height={50}
      width={50}
        src="https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/678b78d87140ff853f2c831c_whatsapp-logo-webflow-cloneable-template-brix-templates.svg"
        alt="WhatsApp"
        className="w-5 h-5 object-cover"
      />
      Chat on WhatsApp
    </Link>
  );
}
