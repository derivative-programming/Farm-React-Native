import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as theme from '../constants/theme'; 
 
interface TextCollapsibleProps {
  text: string;
  name: string; 
}

const TextCollapsible: React.FC<TextCollapsibleProps> = ({ text, name }) => {
  const [isExpanded, setIsExpanded] = useState(false);
 
  if (!text || text.length === 0) {
    return null;
  }

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = text.length <= 50 
    ? text  // If the text is 50 characters or less, show the full text
    : isExpanded 
      ? text // If expanded, show the full text
      : `${text.slice(0, 50)}...`; // Otherwise, show the shortened text with '...'

  return (
    <TouchableOpacity onPress={toggleText} disabled={text.length <= 50}>
      <Text 
        style={[styles.introText, { 
          fontSize: theme.fonts.mediumSize, 
          color: theme.Colors.text 
        }]}
        testID={name}  
      >
        {displayText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  introText: {
    marginBottom: 8,
    textAlign: 'center',
    // Other shared styles can be added here if needed
  },
});

export default TextCollapsible;
