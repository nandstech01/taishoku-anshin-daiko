'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="text-sm mb-4 overflow-hidden">
      <ol className="list-none p-0 inline-flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center whitespace-nowrap">
            {index > 0 && <span className="mx-2 text-gray-500">/</span>}
            {item.href ? (
              <a
                href={item.href}
                className="text-gray-600 hover:text-gray-800"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-800">
                <span className="hidden sm:inline">{item.label}</span>
                <span className="inline sm:hidden">
                  {item.label.length > 10
                    ? `${item.label.slice(0, 10)}...`
                    : item.label}
                </span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;