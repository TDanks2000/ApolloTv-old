import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {SectionTypes} from '../../../@types';
import {RectangleCard} from '../../../components';
import {GenericSectionSkeleton} from '../../../components/Skeletons';
import {api, helpers} from '../../../utils';
import {
  SectionContainer,
  SectionTitle,
  SectionTitleContainer,
  SectionWrapper,
} from '../Sections.shared.styles';

interface Props {
  sectionTitle: string;
  sectionType: SectionTypes;

  type?: 'ANIME' | 'MANGA';
}

const GenericSection = ({sectionTitle, sectionType, type = 'ANIME'}: Props) => {
  const {t} = useTranslation();

  const fetcher = async () => {
    const res = await api.getSection(sectionType, type);

    if (type === 'MANGA') return helpers.convert_result(res);
    return res;
  };

  const {isPending, isError, data, error} = useQuery<any>({
    queryKey: ['section', sectionType, type],
    queryFn: fetcher,
  });

  const renderItem = ({item}: any) => {
    return (
      <RectangleCard
        key={item.id}
        title={item.title}
        poster_image={item.image}
        id={item.id}
        rating={item.rating}
        type={type}
      />
    );
  };

  if (isPending) return <GenericSectionSkeleton />;
  if (isError) return null;

  return (
    <SectionContainer>
      <SectionTitleContainer>
        <SectionTitle>
          {sectionTitle} {type === 'ANIME' ? t('anime') : t('manga')}
        </SectionTitle>
      </SectionTitleContainer>
      <SectionWrapper>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.results}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          renderItem={renderItem}
          contentContainerStyle={{paddingHorizontal: 20}}
        />
      </SectionWrapper>
    </SectionContainer>
  );
};

export default GenericSection;
