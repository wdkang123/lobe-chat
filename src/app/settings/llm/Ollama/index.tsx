import { Ollama } from '@lobehub/icons';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ModelProvider } from '@/libs/agent-runtime';

import ProviderConfig from '../components/ProviderConfig';
import Checker from './Checker';

const OllamaProvider = memo(() => {
  const { t } = useTranslation('setting');

  return (
    <ProviderConfig
      checkerItem={{
        children: <Checker />,
        desc: t('llm.checker.ollamaDesc'),
        label: t('llm.checker.title'),
        minWidth: undefined,
      }}
      provider={ModelProvider.Ollama}
      showApiKey={false}
      showBrowserRequest
      showEndpoint
      title={<Ollama.Combine size={24} />}
      // modelList={{ showModelFetcher: true }}
    />
  );
});

export default OllamaProvider;
