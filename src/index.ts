export default class HqModal {
  private dialog: HTMLDialogElement;
  private name: string;

  constructor(name: string) {
    this.name = name;
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
        this.dialog.showModal();
        document.querySelector('body')?.classList.add('hq-modal-lock');
      });
    });
  }

  private onClose(): void {
    this.dialog.addEventListener('close', () => {
      document.body.classList.remove('hq-modal-lock');
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
      border: 1px solid #444;
      max-width: 500px;
      width: 100%;
      padding: 1rem;
      border-radius: 6px;
    }

    .hq-modal::backdrop {
      background: rgba(0, 0, 0, 0.4);
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
