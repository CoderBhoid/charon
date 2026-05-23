import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { MyVideo } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyComp"
      component={MyVideo}
      durationInFrames={120}
      fps={24}
      width={1920}
      height={1080}
    />
  );
};

try {
  registerRoot(RemotionRoot);
} catch (e: any) {
  if (e.message && e.message.includes('more than once')) {
    console.warn('Ignoring duplicate registerRoot call during HMR re-evaluation.');
  } else {
    throw e;
  }
}
