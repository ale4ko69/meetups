export default {
  data() {
    return {
      offset: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    makePopUpMove() {
      //-- let the popup make draggable & movable.
      this.popup_bar.addEventListener('mousedown', this.popUpMouseDown, false);
      window.addEventListener('mouseup', this.popUpMouseUp, false);

      //-- let the popup make draggable & movable.
    },
    popUpMouseUp() {
      window.removeEventListener('mousemove', this.popUpMove, true);
    },
    popUpMouseDown(e) {
      this.offset.x = e.clientX - this.popup.offsetLeft;
      this.offset.y = e.clientY - this.popup.offsetTop;
      window.addEventListener('mousemove', this.popUpMove, true);
    },
    popUpMove(e) {
      this.popup.style.position = 'absolute';
      var top = e.clientY - this.offset.y;
      var left = e.clientX - this.offset.x;
      this.popup.style.top = top + 'px';
      this.popup.style.left = left + 'px';
    }

  },
  computed: {
    createId() {
      var d = new Date();
      var t = d.getTime();
      return 'popup__' + t;
    }
  }
};
