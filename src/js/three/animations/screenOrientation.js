import { contentOnLoad } from "../../2d/animations/contentOnLoad/contentOnLoad";
import { launchFullScreen } from "../../fullScreen";
import { onLoad } from "../onLoad";

export function screenOrientation (loadingContent, label, transition) {
  launchFullScreen(document.documentElement);
    if(screen.orientation.type === 'landscape-secondary' || screen.orientation.type === 'landscape-primary' ) {
        loadingContent.style.display = 'none';
        onLoad(transition);
        contentOnLoad();
        return;
    }
    loadingContent.style.display = 'flex';
    label.innerText = 'Rotate device!';
}