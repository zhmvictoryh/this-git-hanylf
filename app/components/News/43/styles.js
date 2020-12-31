import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  imageBackground: {
    height: ((Utils.getWidthDevice() - 30) * 3) / 6,
    width: '100%',
  },
  viewBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  styleThumb: {
    borderWidth: 1,
    borderColor: BaseColor.whiteColor,
  },
});
