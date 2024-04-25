'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import PageTitle from '@/components/PageTitle';
import { MORE_MODEL_PROVIDER_REQUEST_URL } from '@/const/url';

import Footer from '../features/Footer';
import Anthropic from './Anthropic';
import Azure from './Azure';
import Bedrock from './Bedrock';
import Google from './Google';
import Groq from './Groq';
import Mistral from './Mistral';
import Moonshot from './Moonshot';
import Ollama from './Ollama';
import OpenAI from './OpenAI';
import OpenRouter from './OpenRouter';
import Perplexity from './Perplexity';
import TogetherAI from './TogetherAI';
import ZeroOne from './ZeroOne';
import Zhipu from './Zhipu';

export default memo(() => {
  const { t } = useTranslation('setting');

  return (
    <>
      <PageTitle title={t('tab.llm')} />
      <OpenAI />
      <Azure />
      <Ollama />
      <Google />
      <Anthropic />
      <Bedrock />
      <OpenRouter />
      <TogetherAI />
      <Groq />
      <Perplexity />
      <Mistral />
      <Moonshot />
      <Zhipu />
      <ZeroOne />
      <Footer>
        <Trans i18nKey="llm.waitingForMore" ns={'setting'}>
          更多模型正在
          <Link aria-label={'todo'} href={MORE_MODEL_PROVIDER_REQUEST_URL} target="_blank">
            计划接入
          </Link>
          中 ，敬请期待 ✨
        </Trans>
      </Footer>
    </>
  );
});
