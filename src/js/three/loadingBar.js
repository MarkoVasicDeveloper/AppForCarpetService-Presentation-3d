import { contentOnLoad } from '../2d/animations/contentOnLoad/contentOnLoad';
import { launchFullScreen } from '../fullScreen';
import { onLoad } from './onLoad';
import { loadingManager } from './textures';

const progressBar = document.getElementById('progressBar');
const logo = document.querySelector('svg text');
const enterButton = document.getElementById('enter');
const loadingContent = document.querySelector('.loadingContent');
const label = document.querySelector('label');

let strokeOfset = 2550;

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
    strokeOfset -= ((loaded / total) * 100 * 4);
    if(strokeOfset < 0) strokeOfset = 0;
    logo.style.strokeDashoffset = strokeOfset;
}

loadingManager.onLoad = function() {
    enterButton.classList.remove('hidden');
    progressBar.classList.add('hidden');
    label.innerText = 'Ready!';
}

export function enter (transition) {
  if(window.innerHeight > window.innerWidth) {
        enterButton.style.display = 'none';
        launchFullScreen(document.documentElement);
        if(screen.orientation.type === 'landscape' || screen.orientation.type === 'landscape-primary' ) {
            loadingContent.style.display = 'none';
            onLoad(transition);
            contentOnLoad();
            return;
        }
        loadingContent.style.display = 'flex';
        label.innerText = 'Rotate device!';
        return;
    }
    loadingContent.style.display = 'none';
    onLoad(transition);
    contentOnLoad();
}