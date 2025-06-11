interface HqModalOptions {
  maxWidth?: string;
  background?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export default class HqModal {
  private dialog: HTMLDialogElement;
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
      ...options,
    };
    this.dialog = this.createDialog();
    this.transferContent();
    this.open();
    this.closeOverlayClick();
    this.btnClose();
    this.inlineCss();
    this.onClose();
  }

  private createDialog(): HTMLDialogElement {
    const dialog = document.createElement('dialog');
    dialog.classList.add(`hq-modal-${this.name}`);
    dialog.setAttribute('data-hq-modal-block', this.name);
    return dialog;
  }

  private transferContent(): void {
    const block = document.querySelector(`[data-hq-modal-block="${this.name}"]`);

    if (block) {
      while (block.firstChild) {
        this.dialog.appendChild(block.firstChild);
      }
    }

    block?.remove();

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
    .hq-modal-${this.name} {
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

    .hq-modal-${this.name}::backdrop {
      background: ${this.options.background};
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
}
