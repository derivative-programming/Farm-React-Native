import { FC, ReactElement } from 'react';
import '../../App.scss';
import { View } from 'react-native';

const Footer: FC = (): ReactElement => {

    return (

        <View testID="footer-text"> 
            Copyright © 2023 • NewCo Inc.
        </View>
    )
}
export default Footer;