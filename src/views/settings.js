function goToFirstWindow(){
  window.api.send('closeChildWindow');
}

window.goToFirstWindow = goToFirstWindow;