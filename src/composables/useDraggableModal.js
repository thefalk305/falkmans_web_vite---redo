// src/composables/useDraggableModal.js

import { onMounted, onUnmounted } from 'vue';

/**
 * Enables drag-and-drop interaction for a DOM element and optionally resets its position on double-click.
 * Also detects touch devices and chooses the appropriate event listeners automatically.
 *
 * @param {string} [elementId='draggable-elem'] - The ID of the draggable HTML element.
 */
export function useDraggableModal(elementId = 'draggable-elem') {
  let draggableElem = null;
  let initialX = 0;
  let initialY = 0;
  let moveElement = false;
  let deviceType = '';

  /**
   * Detects whether the current device supports touch input.
   * Updates the `deviceType` accordingly.
   */
  const isTouchDevice = () => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      deviceType = 'touch';
      return true;
    } else {
      deviceType = 'mouse';
      return false;
    }
  };

  // Define event names for mouse and touch devices
  const events = {
    mouse: {
      down: 'mousedown',
      move: 'mousemove',
      up: 'mouseup',
      dblclick: 'dblclick',
    },
    touch: {
      down: 'touchstart',
      move: 'touchmove',
      up: 'touchend',
    },
  };

  /**
   * Throttle utility to limit execution frequency of the move handler.
   * @param {Function} fn - The function to throttle.
   * @param {number} limit - Time in milliseconds between calls.
   * @returns {Function}
   */
  const throttle = (fn, limit) => {
    let inThrottle = false;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  /**
   * Initiates dragging and stores the initial pointer position.
   * @param {MouseEvent | TouchEvent} e
   */
  const start = (e) => {
    e.preventDefault();
    const pointer = deviceType === 'touch' ? e.touches[0] : e;
    initialX = pointer.clientX;
    initialY = pointer.clientY;
    moveElement = true;
  };

  /**
   * Handles element movement during drag.
   * @param {MouseEvent | TouchEvent} e
   */
  const move = (e) => {
    if (!moveElement) return;
    e.preventDefault();
    const pointer = deviceType === 'touch' ? e.touches[0] : e;
    const newX = pointer.clientX;
    const newY = pointer.clientY;

    draggableElem.style.top =
      draggableElem.offsetTop - (initialY - newY) + 'px';
    draggableElem.style.left =
      draggableElem.offsetLeft - (initialX - newX) + 'px';

    initialX = newX;
    initialY = newY;
  };

  /**
   * Stops dragging when pointer is released or leaves the element.
   */
  const stop = () => {
    moveElement = false;
  };

  /**
   * Optional: Resets the element’s position on double-click.
   * You can make this dynamic if desired.
   * @param {MouseEvent} e
   */
  const dbl = (e) => {
    e.preventDefault();
    draggableElem.style.top = '930px';
    draggableElem.style.left = '600px';
  };

  const enable = () => {
    if (!draggableElem) return;
    const currentEvents = events[deviceType];
    draggableElem.addEventListener(currentEvents.down, start);
    draggableElem.addEventListener(
      currentEvents.move,
      throttle(move, 16) // ~60 FPS
    );
    draggableElem.addEventListener(currentEvents.up, stop);
    draggableElem.addEventListener(
      currentEvents.dblclick ?? 'dblclick',
      dbl
    );
    draggableElem.addEventListener('mouseleave', stop);
  };

  const disable = () => {
    if (!draggableElem) return;
    const currentEvents = events[deviceType];
    draggableElem.removeEventListener(currentEvents.down, start);
    draggableElem.removeEventListener(
      currentEvents.move,
      throttle(move, 16) // ~60 FPS
    );
    draggableElem.removeEventListener(currentEvents.up, stop);
    draggableElem.removeEventListener(
      currentEvents.dblclick ?? 'dblclick',
      dbl
    );
    draggableElem.removeEventListener('mouseleave', stop);
  };

  onMounted(() => {
    draggableElem = document.getElementById(elementId);
    if (!draggableElem) return;
    isTouchDevice();
    enable();
  });

  onUnmounted(() => {
    disable();
  });

  return { enable, disable };
}