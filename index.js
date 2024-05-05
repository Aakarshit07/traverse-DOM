const url="https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";
let hiddenUrl = "";

const getDOM = async (cb) => {
    try {
        const response = await fetch(url)
        const data = await response.text();
        const tempContainer = document.querySelector(".container");
        tempContainer.innerHTML = data; 
        const allChildrenOfBody = tempContainer.children; 
        return getUrl(allChildrenOfBody);
    } catch (error) {
        console.log("failed to fetch: ", error);
    }
};


function getUrl(allChildren) { // getting HTML Collection
    for(let i = 0; i < allChildren.length; i++) {
        let hasCode = allChildren[i];
        if(hasCode.tagName === "CODE") {
            const hasDiv = hasCode.querySelector("div");
            if(hasDiv){
                let hasSpan = hasDiv.querySelector("span");
                if(hasSpan) {
                    let hasITag = hasSpan.querySelector("i");
                    if(hasITag) {
                        let value = hasITag.getAttribute("value");
                        hiddenUrl += value;
                    }
                }
            }
        }      
    }
    return hiddenUrl;
}

getDOM().then(res => console.log(res));
