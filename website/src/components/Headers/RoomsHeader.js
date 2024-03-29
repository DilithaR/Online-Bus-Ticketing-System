import React from "react";

// reactstrap components

// core components

function RoomsHeader() {
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                if (pageHeader.current) {
                    pageHeader.current.style.transform =
                        "translate3d(0," + windowScrollTop + "px,0)";
                }
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });
    return (
        <>
            <div className="page-header page-header-small">
                <div
                    className="page-header-image"
                    /*style={{
                      backgroundImage:
                        "url(" + require("assets/img/bg5.jpg").default + ")",
                    }}*/
                    ref={pageHeader}
                ></div>
                {/*<div className="content-center">
          <Container>
            <h1 className="title">LUXURY AWAITS YOU</h1>
            <div className="text-center">
              Explore from our world class rooms & suites
            </div>
          </Container>
        </div>*/}
            </div>
        </>
    );
}

export default RoomsHeader;
