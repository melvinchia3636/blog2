import { Icon } from '@iconify/react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="mb-6 w-full flex items-center justify-between px-32">
      <a href="https://thecodeblog.net">© 2023 Melvin Chia - thecodeblog.net</a>
      <div className="flex gap-4">
        Follow me on:
        <a href="https://youtube.com/@sillycoder">
          <Icon icon="uil:youtube" className="w-6 h-6" />
        </a>
        <a href="https://github.com/melvinchia3636">
          <Icon icon="uil:github" className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
