import React, { useState, useEffect } from "react";
import { Button, Container, Row, View, Col } from "native-base";
import useAnalyticsDB from "../../hooks/useAnalyticsDB"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const GDPRBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const { logClick } = useAnalyticsDB();

  useEffect(() => {
    const hasAccepted = AsyncStorage.getItem("gdpr_accepted");
    if (hasAccepted) {
      setShowBanner(false);
    }
  }, []);

  const handleAccept = () => {
    logClick("GDPRBanner","accept","");
    AsyncStorage.setItem("gdpr_accepted", "true");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <View
          className="fixed-bottom p-2 text-white"
          style={{
            zIndex: 9999,
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
            background: "#0A4D68",
          }}
        >
          <Container>
            <Row>
              <Col className="d-flex align-items-center justify-content-center">
                <span
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  This website uses cookies to improve your experience. By
                  clicking "Accept", you consent to the use of all cookies in
                  accordance with GDPR.
                </span>
              </Col>
              <Col xs="auto">
                <Button
                  variant="light"
                  onPress={handleAccept}
                  style={{ fontSize: "14px" }}
                >
                  Accept
                </Button>
              </Col>
            </Row>
          </Container>
        </View>
      )}
    </>
  );
};

export default GDPRBanner;
