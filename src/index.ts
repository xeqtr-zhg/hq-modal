interface HqModalOptions {
  maxWidth?: string;
  background?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  showButtonClose?: boolean;
}

export default class HqModal {
  private dialog: HTMLDialogElement;
  private dialogContainer: HTMLDivElement;
  private buttonClose: HTMLDivElement;
  private name: string;
  private options: HqModalOptions;

  constructor(name: string, options: HqModalOptions = {}) {
    this.name = name;
    this.options = {
      maxWidth: '500px',
      background: 'rgba(0, 0, 0, 0.4)',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      showButtonClose: false,
      ...options,
    };
    this.dialog = this.createDialog();
    this.dialogContainer = this.createContainer();
    this.buttonClose = this.createButtonClose();
    this.transferContent();
    this.open();
    this.closeOverlayClick();
    this.btnClose();
    this.inlineCss();
    this.onClose();
  }

  private createDialog(): HTMLDialogElement {
    const dialog = document.createElement('dialog');
    dialog.classList.add(`hq-modal`);
    dialog.classList.add(`hq-modal--${this.name}`);
    dialog.setAttribute('data-hq-modal-block', this.name);

    return dialog;
  }

  private createContainer(): HTMLDivElement {
    const divContainer = document.createElement('div');
    divContainer.classList.add('hq-modal__container');
    divContainer.classList.add(`hq-modal__container--${this.name}`);

    return divContainer;
  }

  private createButtonClose(): HTMLDivElement {
    const button = document.createElement('div');
    button.classList.add('hq-modal__btn-close');
    button.classList.add(`hq-modal__btn-close--${this.name}`);
    button.addEventListener('click', () => this.dialog.close());

    return button;
  }

  private transferContent(): void {
    const block = document.querySelector(`[data-hq-modal-block="${this.name}"]`);

    if (block) {
      while (block.firstChild) {
        this.dialogContainer.appendChild(block.firstChild);
      }
    }

    block?.remove();

    this.dialog.appendChild(this.dialogContainer);

    if (this.options.showButtonClose) {
      this.dialog.appendChild(this.buttonClose);
    }

    document.querySelector('body')?.appendChild(this.dialog);
  }

  private open(): void {
    document.querySelectorAll(`[data-hq-modal-button="${this.name}"]`).forEach((el) => {
      el.addEventListener('click', () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        this.dialog.showModal();
        document.querySelector('body')?.classList.add('hq-modal-lock');
      });
    });
  }

  private onClose(): void {
    this.dialog.addEventListener('close', () => {
      document.body.classList.remove('hq-modal-lock');
      document.body.style.paddingRight = '';
    });
  }

  private closeOverlayClick(): void {
    this.dialog.addEventListener('click', (event) => {
      const rect = this.dialog.getBoundingClientRect();
      const isClickOutsideContent = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;

      if (isClickOutsideContent) {
        this.dialog.close();
      }
    });
  }

  private btnClose(): void {
    this.dialog.querySelectorAll('[data-hq-modal-close]').forEach((el) => {
      el.addEventListener('click', () => {
        this.dialog.close();
      });
    });
  }

  private inlineCss(): void {
    const style = document.createElement('style');
    style.innerHTML = `
    .hq-modal {
      overflow: visible;
    }

    .hq-modal__container {
      overflow: auto;
      max-height: 80vh;
    }

    .hq-modal--${this.name} {
      box-sizing: border-box;
      inset: unset;
      top: ${this.options.bottom === '0' ? this.options.top : 'initial'};
      bottom: ${this.options.top === '0' ? this.options.bottom : 'initial'};
      right: ${this.options.left === '0' ? this.options.right : 'initial'};
      left: ${this.options.right === '0' ? this.options.left : 'initial'};
      border: none;
      max-width: ${this.options.maxWidth};
      width: 90%;
      padding: initial;
    }

    .hq-modal--${this.name}::backdrop {
      background: ${this.options.background};
    }

    .hq-modal__btn-close {
      position: absolute;
      top: -40px;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .hq-modal__btn-close::before {
      content: '';
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23333'><path d='M2 2l12 12M14 2L2 14' stroke='%23333' stroke-width='2' stroke-linecap='round'/></svg>");
      background-repeat: no-repeat;
    }

    .hq-modal-lock {
      overflow: hidden;
    }
  `;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.dialog.appendChild(style);
      });
    } else {
      this.dialog.appendChild(style);
    }
  }

  public hide(): void {
    this.dialog.close();
  }

  public show(): void {
    this.dialog.showModal();
  }
}
