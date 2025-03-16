import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="font-medium text-gray-900">Unlisted Shares India</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Terms & Condition
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">© 2024. Unlisted Shares India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

