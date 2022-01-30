import React,{useState, useRef} from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import Cover from './components/Cover/Cover';
import ColorBlock from './components/ColorBlock/ColorBlock'

function App() {

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [highlights, setHighlights] = useState("");
  const [tagline, setTagline] = useState("");
  const [bgColor, setBgColor] = useState("#161B22");
  const [borderColor, setBorderColor] = useState("#0F6D31");

  const coverRef = useRef(null);
  const duplicateCoverRef = useRef(null);

  const downloadCover = () => {
    const scaledCover = coverRef.current.cloneNode(true);
    scaledCover.style.transform = "scale(2)";
    scaledCover.style.position = "fixed";
    scaledCover.style.top = "0";
    scaledCover.style.left = "0";
    scaledCover.style.zIndex = "-10";
    duplicateCoverRef.current.appendChild(scaledCover);

    html2canvas(scaledCover,{
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    })
    .then((canvas)=>{
      var img=canvas.toDataURL();
      let a=document.createElement("a");
      a.href=img;
      a.download=`${name===""?"unknow":name}'s cover.png`;
      a.click();
      duplicateCoverRef.current.removeChild(scaledCover)
    })
    .catch(console.log);
  }

  function handleForm(event){
    const {name,value} = event.target;
    if(name==="name") setName(value);
    else if (name === "headline") setHeadline(value);
    else if (name === "highlights") setHighlights(value);
    else if (name === "tagline") setTagline(value);
  }

  function changeColor(bg,border){
    setBgColor(bg);
    setBorderColor(border);
  }

  let colorsArr=[
    ["#161B22", "#0F6D31"],
    ["#5039A3", "#FC9776"],
    ["#060607", "#3D5FF8"],
    ["#172346", "#4FD0ED"],
    ["#292C31", "#E94C2B"],
  ]
  return (
    <>
      <div ref={duplicateCoverRef}></div>
      <div className="coverWrapper">
        <Cover
          name={name === "" ? "Your Name Here": name}
          headline={headline === "" ? "Headline comes here" : headline}
          highlights={highlights === "" ? "Your highlights and achievements" : highlights}
          tagline={tagline === ""? "A tagline, a quote or your goals/missions": tagline}
          coverRef={coverRef}
          bgColor={bgColor}
          borderColor={borderColor}
        />
      </div>

      <div className='scrollContainer'>
        <div className='grid-container'>
          <form className="form">
            <div className="grid-x grid-margin-x">
              {[
                ["name",name],["headline",headline],["highlights",highlights],["tagline",tagline],
              ].map((item,index)=>{
                return(
                  <div className='cell large-3 medium-6' key={index}>
                    <label htmlFor={item[0]} className='label'>{item[0]}</label>
                    <input name={item[0]} value={item[1]} onChange={handleForm} className='input' />
                  </div>
                )
              })}
            </div>
          </form>
          <div className="grid-x grid-margin-x">
            <div className="cell large-6">
              <div className='container'>
                <div className='circles'>
                  {colorsArr.map((color,index)=>{
                    return (
                      <div onClick={()=>{changeColor(color[0],color[1])}} key={index}>
                        <ColorBlock color={{bg:color[0], border:color[1]}}/>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className='footer'>
        <div className="download-button" onClick={downloadCover}>Download Cover</div>
      </footer>
    </>
  );
}

export default App;
