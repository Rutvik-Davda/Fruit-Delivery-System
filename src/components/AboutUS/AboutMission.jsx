import React from "react";
import "../../css/AboutMission.css";

import Mission1 from "../../assets/images/Mission-1.jpg";
import Mission2 from "../../assets/images/Mission-2.jpg";
import Mission3 from "../../assets/images/Mission-3.jpg";

function AboutMission() {
  return (
    <div className="am-wrapper">

      <section className="am-section">
        <div className="am-row">
          <div className="am-col am-image-col">
            <img src={Mission1} alt="Mission 1" />
          </div>

          <div className="am-col am-text-box">
            <p>
              <b>
                Established in December 2018 by Gloria Zhao, an agriculture
                enthusiast, the company has become a key player in the fruit
                industry. Initially, it leveraged WeChat and other e-commerce
                platforms to thrive in the domestic fresh fruit trade, building
                a loyal customer base.
              </b>
            </p>
          </div>
        </div>
      </section>

      <section className="am-section">
        <div className="am-row reverse">
          <div className="am-col am-text-box">
            <p>
              Established in December 2018 by Gloria Zhao, an agriculture
              enthusiast, the company has become a key player in the fruit
              industry. Initially, it leveraged WeChat and other e-commerce
              platforms to thrive in the domestic fresh fruit trade, building a
              loyal customer base.
            
              In 2021, the company shifted focus to fresh fruit exports, offering
              products like apples, mandarin, and grapes. Over the past four
              years, its export volume grew by at least 50% annually.
            
              In 2025, the company launched “Glori Fruits”, symbolizing its
              quality pursuit and global vision. In the next five to ten years,
              it will focus on fresh, dried, frozen fruits and juice as a growth
              driver.
            </p>
          </div>

          <div className="am-col am-image-col">
            <img src={Mission2} alt="Mission 2" />
          </div>
        </div>
      </section>

      <section className="am-section">
        <div className="am-row">
          <div className="am-col am-image-col">
            <img src={Mission3} alt="Mission 3" />
          </div>

          <div className="am-col am-text-box">
            <p>
              The company’s strength lies in its professional team and
              partnerships with quality suppliers and logistics providers.
           
              With “Gratitude, Learning, and Sharing” at its core, the company
              integrates these values into its operations and aims to be a
              leading exporter with win-win growth.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutMission;
