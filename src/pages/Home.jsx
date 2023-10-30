import Footer from "../components/Footer/Footer"
import HomePageSlider from "../components/Sliders/HomePageSlider";
import Restaurants from "../components/Restaurants/Restaurants";
import Foods from "../components/foodItems/Foods";
import ExclusiveFoods from "../components/foodItems/ExclusiveFoods";

function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between
     
       ${"theme"}    `}
        >
            <section className="w-full  bg-background  ">
                <div className=" p-6">
                    <HomePageSlider />

                    <Restaurants />

                    <ExclusiveFoods />

                    <Foods />


                </div>
                <Footer />
            </section>
        </main>
    )
}
export default Home