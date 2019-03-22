import React from "react";
import jumbo1 from '../supports/img/jumbo1.png'
import jumbo2 from '../supports/img/jumbo2.png'
import jumbo3 from '../supports/img/jumbo3.png'

export default () => (
    
    <div className="container">
        <div className="row justify-content-center">

            <div className="col-lg-4" style={{ marginBottom: "20px" }}>
                <div className="media">
                    <div className="media-left">
                        <a href="/">
                        <img className="media-object" src={jumbo1} 
                            width={85} height={85} alt="Feature 1" />
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">Transparant</h4>
                        Pembayaran Anda baru diteruskan ke penjual setelah barang Anda diterima
                    </div>
                </div>
            </div>

            <div className="col-lg-4" style={{ marginBottom: "20px" }}>
                <div className="media">
                    <div className="media-left">
                        <a href="/">
                        <img className="media-object" src={jumbo2} 
                            width={85} height={85} alt="Feature 2" />
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">Aman</h4>
                        Bandingkan Review untuk berbagai online shop terpercaya se-Indonesia
                    </div>
                </div>
            </div>

            <div className="col-lg-4">  
                <div className="media">
                    <div className="media-left">
                        <a href="/">
                        <img className="media-object" src={jumbo3} 
                            width={85} height={85} alt="Feature 3" />
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">Fasilitas Escrow Terpercaya</h4>
                        Fasilitas Escrow (Rekening Bersama) OTe Shop tidak dikenakan biaya tambahan
                    </div>
                </div>
            </div>

        </div>
    </div>
  
);
