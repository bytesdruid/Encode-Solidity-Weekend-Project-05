import React, { ReactNode } from 'react';
import classes from '../FadeCard.module.css';

interface FadeCardProps {
    children: ReactNode;
  }

function FadeCard({ children }: FadeCardProps) {
  return <div className={classes['fade-container']}>{children}</div>;
}

export default FadeCard;