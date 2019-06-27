/**
 * @description Box model mixin
 */
export default {
  props: {
    width: [ Number, String ],
    height: [ Number, String ],
    margin: [ Number, String ],
    marginTop: [ Number, String ],
    marginBottom: [ Number, String ],
    marginLeft: [ Number, String ],
    marginRight: [ Number, String ],
    padding: [ Number, String ],
    paddingTop: [ Number, String ],
    paddingBottom: [ Number, String ],
    paddingLeft: [ Number, String ],
    paddingRight: [ Number, String ]
  },
  computed: {
    propsStyle () {
      return {
        width: this.width,
        height: this.height,
        margin: this.margin,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        marginLeft: this.marginLeft,
        marginRight: this.marginRight,
        padding: this.padding,
        paddingTop: this.paddingTop,
        paddingBottom: this.paddingBottom,
        paddingLeft: this.paddingLeft,
        paddingRight: this.paddingRight
      }
    }
  }
}
