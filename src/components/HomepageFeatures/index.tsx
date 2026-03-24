import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Modern Client UI',
    description: (
      <>
        Built using React 19 and Tailwind CSS v4 to provide a responsive, elegant, and fast user experience.
      </>
    ),
  },
  {
    title: 'Scalable API Engine',
    description: (
      <>
        A robust NestJS backend incorporating TypeORM, PostgreSQL, and strict Zod validation for reliable performance.
      </>
    ),
  },
  {
    title: 'Unified Source of Truth',
    description: (
      <>
        Read detailed explanations of all major endpoints, core architectures, and component structures in one place.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md" style={{ marginTop: '2rem' }}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
