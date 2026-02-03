export type AdditionalInfo = { label: string; content: string };

export type UseCaseStep = {
  title: string;
  featureUsed: string;
  workflow: string;
  additionalInfo?: AdditionalInfo[];
  imageKey: string;
};

export type UseCase = {
  title: string;
  scenario: string;
  solution: string;
  description: string;
  steps: UseCaseStep[];
};

export type Industry = {
  iconKey: string;
  name: string;
  description: string;
  useCases: UseCase[];
};
