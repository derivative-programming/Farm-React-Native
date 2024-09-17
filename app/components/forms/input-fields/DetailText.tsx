import React, { FC, ReactElement } from 'react';
import { Text, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import * as theme from '../../../constants/theme';

interface DetailsTextProps {
  content: string;
}

export const DetailsText: FC<DetailsTextProps> = ({
  content,
}): ReactElement => {
  const containsHtml = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text);

  const isHtml = containsHtml(content);

  if (isHtml) {
    return (
      <HTMLView
        value={content}
        stylesheet={styles}
      />
    );
  }

  return <Text style={styles.detailText}>{content}</Text>;
};

const styles = StyleSheet.create({
  detailText: {
    color: '#6c757d',  
    fontSize: theme.fonts.smallSize,
    marginTop: -10, 
    marginBottom: 10,
  },
});
