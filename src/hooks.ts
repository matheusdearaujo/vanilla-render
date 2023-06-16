type ITemplateCallback = { (): string };
type IEventArray = [{ id: string; callback: any }] | Array<any>;

let _root: Element | null;
let _templateCallback: ITemplateCallback;

let hooks: Array<any> = [];
let idx: number = 0;

const _eventArray: IEventArray = [];

export function useState(initValue: any) {
  let state;

  state = hooks[idx] !== undefined ? hooks[idx] : initValue;

  const _idx = idx;

  const setState = (newValue: any) => {
    hooks[_idx] = newValue;
    render();
  };

  idx++;

  return [state, setState];
}

export function useEffect(callback: any, dependancyArray: Array<any>) {
  const oldDependancies = hooks[idx];
  let hasChanged = true;

  if (oldDependancies) {
    hasChanged = dependancyArray.some(
      (dep, i) => !Object.is(dep, oldDependancies[i]),
    );
  }

  hooks[idx] = dependancyArray;
  idx++;

  if (hasChanged) callback();
}

export function init(
  rootElement: Element | null,
  templateCallback: ITemplateCallback,
) {
  _root = rootElement;
  _templateCallback = templateCallback;
  render();
}

export function render() {
  idx = 0;
  _eventArray.length = 0;
  _root && (_root.innerHTML = _templateCallback());
}

//@ts-ignore
function handleEventListeners(event: any) {
  _eventArray.forEach((target: any) => {
    if (event.target.id === target.id) {
      event.preventDefault();
      target.callback();
    }
  });
}

document.addEventListener("click", event => handleEventListeners(event));

export function addOnClick(id: string, callback: any) {
  _eventArray.push({ id, callback });
}
