import React, { FC, ReactElement } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Container } from "native-base";
import "../../App.scss"
type Props = {
  children: ReactElement;
};

const LayoutComponent: FC<Props> = (props: Props): ReactElement => {
  return (
    <Container>
      <View>
        <Header />
      </View>
      <View>{props.children}</View>
      <View>
        <Footer />
      </View>
    </Container>
  );
};
export default LayoutComponent;
