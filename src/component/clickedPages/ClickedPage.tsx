import Header from '../Header/Header';
// import '../App.css'
export default function ClickedPage(){
	  
    return (
		<>
            <Header/>
            <h1 style={{color:'white'}}>clicked Page</h1>
            <section className="container">
                <img id="hackathonImg" src="../../imgs/HACKATHON.png" alt="" />
            </section>
		</>
    );
}