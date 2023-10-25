


function NotFoundPage(){
    return (
        // <PageLayout
            heading = "NotFound"
            links= {[ { to: "/login", text: "Go Back"}]}
        
        <div> 원하시는 페이지를 찾을 수 없습니다. </div>
      
    )
}

export default NotFoundPage;