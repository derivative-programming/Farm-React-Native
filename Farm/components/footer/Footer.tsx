import { FC, ReactElement } from 'react';
import '../../App.scss';
import { View } from 'native-base';

const Footer: FC = (): ReactElement => {

    return (

        <View className="mt-1 mb-3" testID="footer-text">
            <hr/>
            Copyright © 2023 • NewCo Inc.
        </View>
    )
}
export default Footer;