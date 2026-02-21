import React from 'react';
import { getAvatarInitials, getAvatarColor } from '../utils';
import styles from './Avatar.module.css';

interface AvatarProps {
  fullName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ fullName, size = 'md', className = '' }) => {
  const initials = getAvatarInitials(fullName);
  const backgroundColor = getAvatarColor(initials);

  const sizeClass = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
  };

  const colorClass = `avatar-color-${backgroundColor.replace('#', '')}`;

  return (
    <div
      className={`${styles.avatar} ${sizeClass[size]} ${colorClass} ${className}`}
      title={fullName}
      aria-label={`Avatar for ${fullName}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
