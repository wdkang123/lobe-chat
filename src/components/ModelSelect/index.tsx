import { Icon, Tooltip } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { LucideEye, LucidePaperclip, ToyBrick } from 'lucide-react';
import numeral from 'numeral';
import { rgba } from 'polished';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { ChatModelCard } from '@/types/llm';

import ModelIcon from '../ModelIcon';
import ModelProviderIcon from '../ModelProviderIcon';

const useStyles = createStyles(({ css, token }) => ({
  custom: css`
    width: 36px;
    height: 20px;

    font-family: ${token.fontFamilyCode};
    font-size: 12px;
    color: ${rgba(token.colorWarning, 0.75)};

    background: ${token.colorWarningBg};
    border-radius: 4px;
  `,
  tag: css`
    cursor: default;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;

    border-radius: 4px;
  `,
  tagBlue: css`
    color: ${token.geekblue};
    background: ${token.geekblue1};
  `,
  tagGreen: css`
    color: ${token.green};
    background: ${token.green1};
  `,
  token: css`
    width: 36px;
    height: 20px;

    font-family: ${token.fontFamilyCode};
    font-size: 11px;
    color: ${token.colorTextSecondary};

    background: ${token.colorFillTertiary};
    border-radius: 4px;
  `,
}));
const formatTokenNumber = (num: number): string => {
  if (num < 1000) return '1K';
  const kiloToken = Math.floor(num / 1000);
  return kiloToken < 1000 ? `${kiloToken}K` : `${Math.floor(kiloToken / 1000)}M`;
}

interface ModelInfoTagsProps extends ChatModelCard {
  directionReverse?: boolean;
  placement?: 'top' | 'right';
}

export const ModelInfoTags = memo<ModelInfoTagsProps>(
  ({ directionReverse, placement = 'right', ...model }) => {
    const { t } = useTranslation('components');
    const { styles, cx } = useStyles();

    return (
      <Flexbox direction={directionReverse ? 'horizontal-reverse' : 'horizontal'} gap={4}>
        {model.files && (
          <Tooltip placement={placement} title={t('ModelSelect.featureTag.file')}>
            <div className={cx(styles.tag, styles.tagGreen)}>
              <Icon icon={LucidePaperclip} />
            </div>
          </Tooltip>
        )}
        {model.vision && (
          <Tooltip placement={placement} title={t('ModelSelect.featureTag.vision')}>
            <div className={cx(styles.tag, styles.tagGreen)}>
              <Icon icon={LucideEye} />
            </div>
          </Tooltip>
        )}
        {model.functionCall && (
          <Tooltip
            overlayStyle={{ maxWidth: 'unset' }}
            placement={placement}
            title={t('ModelSelect.featureTag.functionCall')}
          >
            <div className={cx(styles.tag, styles.tagBlue)}>
              <Icon icon={ToyBrick} />
            </div>
          </Tooltip>
        )}
        {model.tokens && (
          <Tooltip
            overlayStyle={{ maxWidth: 'unset' }}
            placement={placement}
            title={t('ModelSelect.featureTag.tokens', {
              tokens: numeral(model.tokens).format('0,0'),
            })}
          >
            <Center className={styles.token}>{formatTokenNumber(model.tokens)}</Center>
          </Tooltip>
        )}
        {/*{model.isCustom && (*/}
        {/*  <Tooltip*/}
        {/*    overlayStyle={{ maxWidth: 300 }}*/}
        {/*    placement={placement}*/}
        {/*    title={t('ModelSelect.featureTag.custom')}*/}
        {/*  >*/}
        {/*    <Center className={styles.custom}>DIY</Center>*/}
        {/*  </Tooltip>*/}
        {/*)}*/}
      </Flexbox>
    );
  },
);

interface ModelItemRenderProps extends ChatModelCard {
  showInfoTag?: boolean;
}

export const ModelItemRender = memo<ModelItemRenderProps>(({ showInfoTag = true, ...model }) => {
  return (
    <Flexbox align={'center'} gap={32} horizontal justify={'space-between'}>
      <Flexbox align={'center'} gap={8} horizontal>
        <ModelIcon model={model.id} size={20} />
        {model.displayName || model.id}
      </Flexbox>

      {showInfoTag && <ModelInfoTags {...model} />}
    </Flexbox>
  );
});

interface ProviderItemRenderProps {
  provider: string;
}

export const ProviderItemRender = memo<ProviderItemRenderProps>(({ provider }) => {
  const { t } = useTranslation('modelProvider');

  return (
    <Flexbox align={'center'} gap={4} horizontal>
      <ModelProviderIcon provider={provider} />
      {t(`${provider}.title` as any)}
    </Flexbox>
  );
});
