const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",
  
    navbar1: "flex flex-row justify-between h-[90px] w-full border-black border-b p-6 items-center",
    navbar2: "flex flex-row justify-between h-[90px] w-full p-6 items-center",
    heading1: "font-reenie font-normal text-[48px] text-black  w-full",
    heading2: "font-josefin font-normal text-[20px] text-black  w-full",
    paragraph1: "font-josefin font-medium text-black text-center text-[15px] leading-6",
    paragraph2: "font-josefin font-medium text-black text-right text-[13px] leading-6",
    postTitle: "font-josefin font-medium text-black",
    paragraph3: "font-josefin font-medium text-black text-center whitespace-nowrap text-[12px]",
    dropzone: "font-josefin font-medium text-black text-center  text-[14px]",
    logLabel: "font-josefin font-semibold text-black text-center text-[15px]",
    slider1: "font-josefin font-normal text-gray-500 text-center text-[17px]",
    slider2: "font-josefin font-bold text-black text-center text-[17px]",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4", 

    canavsSection1: "w-[690px] h-[480px] bg-white border border-gray-800",
    canavsSection2: "w-[550px] h-[480px] bg-white border border-gray-800 overflow-x-hidden overflow-y-auto",

    uploadButton: "flex justify-center w-[150px] bg-transparent rounded-full border border-black m-2 p-2",
  
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",

    categoryHover: "transform transition duration-500 hover:scale-125",
    itemHover: "transform transition duration-500 hover:scale-125",

    getStartedButton: "bg-transparent text-center items-center hover:bg-white text-black hover:text-pink-900 py-2 px-4 border border-das border-black rounded-full hover:border-transparent font-gelasio w-[200px] font-normal text-[17px]",
    logButton: "w-full px-4 py-2 tracking-wide text-primary transition-colors duration-200 transform bg-neutral-800 rounded-3xl hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600",
    logInput: "block w-full px-4 py-2 mb-3 text-neutral-800 bg-transparent border-b border-black  focus:outline-none",

    userWidget: "h-[150px] flex flex-col",
    userWidgetPost: "w-[300px] flex flex-col",
    userInfo: "font-josefin font-medium text-black text-[14px]",
    bio: "font-josefin font-medium text-black text-center text-[15px]",

    navProfilePic: "object-cover w-[50px] h-[50px] cursor-pointer rounded-full",
    navProfileIcon: "w-[25px] h-[25px] cursor-pointer",
    userImage1: "object-cover rounded-full w-[100px] h-[100px] cursor-pointer",
    userImage2: "object-cover rounded-full w-[65px] h-[65px] cursor-pointer",

    postWidget: "w-[450px] h-[250x] flex flex-col justify-between bg-white p-3 m-2 rounded-2xl",
    grid1: "grid grid-cols-1 gap-4 justify-center",
    grid2: "grid grid-cols-2 gap-4 justify-center",
    draftWidget: "w-[350px] h-[200x] flex flex-col bg-pink-50 p-3 m-2 rounded-2xl",

    itemContainer: "container w-[200px] h-[200px] p-3 m-3 bg-white rounded-2xl",
    itemsWidget: "bg-gradient-to-t from-gradient via-gradient to-primary",
    publishWidget: "top-1/2 left-1/2 mt-[-120px] ml-[-175px] absolute w-[350px] bg-white bg-pink-50 p-3 m-2 rounded-2xl",
    publishButon: "px-4 py-2 text-primary transition-colors duration-200 transform bg-neutral-800 rounded-3xl hover:bg-secondary hover:text-black focus:outline-none ",
    publishCancelButon: "px-4 py-2 border border-black text-black transition-colors duration-200 transform bg-white rounded-3xl hover:bg-neutral-700 hover:text-primary focus:outline-none ",
    draftPicture: "w-[340px]",
    number: "font-josefin font-medium text-black text-[16px] p-2",

    bgAbout: "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary via-primary to-primary",
    // bgHero: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 via-pink-600 to-blue-600",
    bgHero: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 via-pink-600 to-blue-600",
  };
  
  export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
  };
  
  export default styles;