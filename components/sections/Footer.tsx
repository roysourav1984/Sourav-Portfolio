import type { ContactInfo } from '@/lib/types';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  data: ContactInfo;
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-dark text-paper py-8 sm:py-12 md:py-16 px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 sm:mb-12 border-b border-rule pb-8 sm:pb-12">
          <p className="text-body-md sm:text-body-lg leading-relaxed mb-4 sm:mb-6">
            Interested in collaborating on transformational technology initiatives?
            Let&apos;s explore how we can drive meaningful outcomes together.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 text-paper pb-1 border-b-2 border-transparent hover:border-accent transition-colors"
              title={`Email: ${data.email}`}
            >
              <MdEmail size={20} />
              <span className="text-body-sm sm:text-body-md">{data.email}</span>
            </a>
            <a
              href={data.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-paper pb-1 border-b-2 border-transparent hover:border-accent transition-colors"
              title="LinkedIn profile"
            >
              <FaLinkedin size={20} />
              <span className="text-body-sm sm:text-body-md">LinkedIn</span>
            </a>
          </div>

          <p className="text-body-xs sm:text-body-sm text-mid">
            © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
