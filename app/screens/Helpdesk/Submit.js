import {
  Text,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  RefreshControl,
  Header,
  Icon,
  ModalFilterLocation,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import mime from 'mime';

export default function SubmitHelpdesk({route, props}) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [userName, setUserName] = useState(users.name);
  const [urlApi, seturlApi] = useState(API_URL);

  const [spinner, setSpinner] = useState(true);

  const [dataCategory, setDataCategory] = useState([]);

  const [typeLocation, setTypeLocation] = useState('');
  const [passPropStorage, setPassPropStorage] = useState();
  const [passProp, setPassProp] = useState(route.params.saveStorage);
  console.log('urutan ke empat props', passProp);
  const [titles, setTitles] = useState('');
  const [textLocation, setTextLocation] = useState('');
  const [textLocationCode, setTextLocationCode] = useState('');
  const [textContact, setTextContact] = useState('');
  const [textDescs, setTextDescs] = useState('');
  const [image, setImage] = useState('');
  const [groupCd, setGroupCd] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [_isMount, set_isMount] = useState(false);
  const [dataLocation, setLocation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [singleFile, setSingleFile] = useState(null);

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    const data = {
      email: email,
      app: 'O',
    };

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // token: "",
      },
    };

    await axios
      .get(
        `http://34.87.121.155:2121/apiwebpbi/api/getData/mysql/${data.email}/${data.app}`,
        {
          config,
        },
      )
      .then(res => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        arrDataTower.map(dat => {
          if (dat) {
            setdataTowerUser(dat);
          }
        });
        setArrDataTowerUser(arrDataTower);
        setSpinner(false);

        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error);
        // alert('error get');
      });
  };

  const getDataStorage = async () => {
    // --- get data storage all helpdesk dari depan form
    const value = await AsyncStorage.getItem('@helpdeskStorage');
    const passPropStorage = JSON.parse(value);
    console.log('getdata storage,', passPropStorage);
    setPassPropStorage(passPropStorage);

    //   -- get data storage location
    const loc = await AsyncStorage.getItem('@locationStorage');
    const passLocStorage = JSON.parse(loc);
    console.log('getdata passLocStorage,', passLocStorage);

    setTextLocation(passLocStorage.descs);
    setTextLocationCode(passLocStorage.location_cd);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      // if (!route.params.passLocation) {
      //   setTextLocation('');
      //   setTextLocationCode('');
      // } else {
      // console.log('text location', route);
      //   setTextLocation(route.params.passLocation.descs);
      //   setTextLocationCode(route.params.passLocation.location_cd);
      // }

      getDataStorage();
    });
  }, []);

  const onSelect = data => {
    console.log('data from onselect modal', data);
  };

  useEffect(() => {
    setTimeout(() => {
      setTextLocation('');
      setLoading(false);
      getTower(users);
      getDataStorage();
      //   getLocation();
      // setSpinner(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // getDataStorage();
    setTimeout(() => {
      const passProps = passProp;
      console.log('props dari select category ke submit', passProps);
      let titles = '';
      if (passProps.complain_type == 'C') {
        titles = 'Complain';
      } else if (passProps.complain_type == 'R') {
        titles = 'Request';
      } else {
        titles = 'Application';
      }
      const group_cd = users.Group;
      const reportdate = moment(new Date()).format('DD MMMM YYYY h:mm');
      console.log('group_cd', group_cd);

      console.log('porprs', submitTicket);

      setTitles(titles);
      setGroupCd(group_cd);
      setReportDate(reportdate);
    }, 3000);
  }, []);

  useEffect(() => {
    set_isMount(true);

    // returned function will be called on component unmount
    return () => {
      set_isMount(false);
    };
  }, []);

  //   useFocusEffect(
  //     useEffect(() => {
  //       console.log('rutes', props);
  //       return;
  //     }, [props]),
  //   );

  const handlePhotoPick = () => {
    console.log('datImage', image);
    Alert.alert(
      'Select a Photo',
      'Choose the place where you want to get a photo',
      [
        {text: 'Gallery', onPress: () => fromGallery()},
        {text: 'Camera', onPress: () => fromCamera()},
        {
          text: 'Cancel',
          onPress: () => console.log('User Cancel'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const fromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: false,
    })
      .then(image => {
        console.log('received image', image);

        setImage([
          {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        ]);
        // setImage(prevState => ({
        //   image: [
        //     ...prevState.image,
        //     {
        //       uri: image.path,
        //       width: image.width,
        //       height: image.height,
        //       mime: image.mime,
        //     },
        //   ],
        // }));
      })
      .catch(e => console.log('tag', e));
  };

  const fromGallery = (cropping, mediaType = 'photo') => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,

      multiple: true,
    })
      .then(image => {
        console.log('received image', image);
        for (var i = 0; i < image.length; i++) {
          setImage({
            image: [
              {
                uri: image[i].path,
                width: image[i].width,
                height: image[i].height,
                mime: image[i].mime,
              },
            ],
          });
        }
      })
      .catch(e => console.log('tag', e));
  };

  const modalBankMaster = () => {
    navigation.navigate('ModalLocation');
  };

  function submitTicket() {
    console.log('getdata storage,', passPropStorage);
    const passProps = passProp;
    console.log('passprops', passProps);
    const body = passPropStorage;

    // const fileImg = image.uri.replace('file://', '');

    const fileUpload = singleFile;
    const bodyData = new FormData();
    bodyData.append('email', passProp.dataDebtor.email);
    bodyData.append('entity_cd', passProp.entity_cd);
    bodyData.append('project_no', passProp.project_no);
    bodyData.append('reportdate', '04 Nov 2021 08:47');
    bodyData.append('takenby', 'Bagus');
    bodyData.append('lotno', passProp.lot_no.lot_no);
    bodyData.append('debtoracct', passProp.dataDebtor.debtor_acct);
    bodyData.append('category', passProp.data.category_cd);
    bodyData.append('floor', passProp.floor);
    bodyData.append('location', '059');
    bodyData.append('reqtype', passProp.location_type);
    bodyData.append('workreq', textDescs);
    bodyData.append('reqby', passProp.reportName);
    bodyData.append('contactno', passProp.contactNo);
    bodyData.append('audit_user', passProp.data.audit_user);
    bodyData.append('responddate', '04 Nov 2021 08:47');
    bodyData.append('userfile', {
      uri: image[0].uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    console.log('liatbody', bodyData);
    return fetch(
      'http://34.87.121.155:2121/apiwebpbi/api/csentry-saveTicketWithImage',
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: bodyData,
      },
    )
      .then(res => {
        return res.json().then(resJson => {
          alert(resJson.Pesan);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //     entity_cd: x.entity_cd,
  //       project_no: x.project_no,
  //       // request_by: x.reportName,
  //       reportdate: '04 Nov 2021 08:47',
  //       takenby: 'MGR',
  //       debtoracct: '10180',
  //       lotno: 'R27A',
  //       category: 'EE01',
  //       floor: x.floor,
  //       location: '059',
  //       reqtype: 'U',
  //       workreq: 'Test API With Image',
  //       reqby: 'RIKI',
  //       contactno: x.contactNo,
  //       audit_user: x.data.audit_user,
  //       responddate: '04 Nov 2021 08:47',
  //       userfile: fileImg,

  //     email: email, //-email

  //     // report_no: dataTicketNo,
  //     entity_cd: x.entity_cd,
  //     project_no: x.project_no,
  //     // request_by: x.reportName,
  //     reportdate: '04 Nov 2021 08:47',
  //     takenby: 'RIKKI',
  //     lot_no: x.lot_no,
  //     audit_user: x.data.audit_user,
  //     category_cd: 'EE01',
  //     floor: x.floor,
  //     reqtype: x.location_type,
  //     workreq: 'Test API With Image',
  //     reqby: x.reqby,
  //     contactNo: x.contactNo,
  //     // filename: fileName,
  //     // userfile: fileImg,
  // const onSubmit = async () => {
  //   console.log('getdata storage,', passPropStorage);
  //   //  this.setState({isLoading: true, loadingText: 'Saving data ...'});
  //   const passProps = passProp;
  //   console.log('passprops', passProps);

  //   const prevProps = passPropStorage;

  //   let savePhoto = [];

  //   image.map((images, index) => {
  //     let fileName =
  //       userName.replace(' ', '_') +
  //       '_' +
  //       moment(new Date()).format('MMDDYYYY') +
  //       '_ticket_' +
  //       (index + 1) +
  //       '.jpg';
  //     // let fileImg = RNFetchBlob.wrap(images.uri.replace('file://', ''));
  //     let fileImg = images.uri.replace('file://', '');

  //     const formData_pict = {
  //       // data: data,
  //       seq_no_pict: index,
  //       filename: fileName,
  //       userfile: fileImg,
  //     };

  //     console.log('dataSaveAll', formData_pict);
  //     savePhoto.push(formData_pict);
  //   });

  //   console.log('ssavefoto', savePhoto);

  //   const formData = {
  //     email: email, //-email
  //     project_no: prevProps.project_no, //-project_no
  //     entity_cd: prevProps.entity_cd, //-entity_cd
  //     reportdate: reportDate,
  //     takenby: prevProps.data.audit_user, //ini siapa?? ini diambil darimana?

  //     //   rowID: prevProps.data.rowID,

  //     debtoracct: prevProps.dataDebtor.debtor_acct, //-debtoracct
  //     lotno: prevProps.lot_no.lot_no, //-lotno
  //     // ticket_no: prevProps.ticketNo,
  //     category: prevProps.data.category_cd, //-category
  //     floor: prevProps.floor, //-level_no / floor
  //     location: textLocationCode,
  //     //   reqtype: prevProps.data.complain_type, //complain type ? atau request yype?
  //     reqtype: prevProps.location_type,
  //     workreq: textDescs,
  //     reqby: prevProps.reportName, //reported_by

  //     contactno: prevProps.contactNo, //-contact_no
  //     audit_user: prevProps.data.audit_user, //-
  //     //   request_by: userName, //-username
  //     responddate: reportDate, //gatau ini diambil darimana
  //   };

  //   console.log('fordata submit', formData);

  //   if (_isMount) {
  //     setSpinner(false);

  //     let config = {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     };
  //     console.log(config);
  //     // console.log(urlApi + '/csentry-saveTicket');

  //     await axios
  //       .post(
  //         'http://34.87.121.155:2121/apiwebpbi/api/csentry-saveTicketWithImage',
  //         formData,
  //         {
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         },
  //       )
  //       .then(res => {
  //         console.log('res urlapi', res);
  //         console.log('res urlapi', res.data.Pesan);
  //         console.log('ticket_no', res.data.Ticket_No);
  //         // return result.response.data;

  //         //
  //         alert(res.Pesan);
  //       })
  //       .catch(error => {
  //         console.log('err', error.response);
  //         alert('error nih');
  //       });
  //   }
  // };

  // const uploadPhoto = async dataTicketNo => {
  //   console.log('dataReportno', dataTicketNo);
  //   //   this.setState({isLoading: true, loadingText: 'Uploading image ...'});
  //   const passProps = passProp;
  //   const x = passProps;
  //   const prevProps = passPropStorage;
  //   console.log('x uplaod foto', x);

  //   const data = {
  //     email: email, //-email

  //     // report_no: dataTicketNo,
  //     entity_cd: x.entity_cd,
  //     project_no: x.project_no,
  //     // request_by: x.reportName,
  //     reportdate: '04 Nov 2021 08:47',
  //     takenby: 'RIKKI',
  //     lot_no: x.lot_no,
  //     audit_user: x.data.audit_user,
  //     category_cd: 'EE01',
  //     floor: x.floor,
  //     reqtype: x.location_type,
  //     workreq: 'Test API With Image',
  //     reqby: x.reqby,
  //     contactNo: x.contactNo,
  //     // filename: fileName,
  //     // userfile: fileImg,
  //   };

  //   console.log('coba liat', data);

  //   let dataSaveAll = [];
  //   image.map(async (images, index) => {
  //     let fileName =
  //       x.reportName.replace(' ', '_') +
  //       '_' +
  //       moment(new Date()).format('MMDDYYYY') +
  //       '_ticket_' +
  //       (index + 1) +
  //       '.jpg';
  //     //   let fileImg = RNFetchBlob.wrap(images.uri.replace('file://', ''));
  //     let fileImg = images.uri.replace('file://', '');
  //     console.log('fileimg', fileImg);

  //     // const file =  [...fileImg],

  //     const formData_pict = {
  //       // name: 'image',
  //       // data: data,
  //       email: email, //-email

  //       // report_no: dataTicketNo,
  //       entity_cd: x.entity_cd,
  //       project_no: x.project_no,
  //       // request_by: x.reportName,
  //       reportdate: '04 Nov 2021 08:47',
  //       takenby: 'MGR',
  //       debtoracct: '10180',
  //       lotno: 'R27A',
  //       category: 'EE01',
  //       floor: x.floor,
  //       location: '059',
  //       reqtype: 'U',
  //       workreq: 'Test API With Image',
  //       reqby: 'RIKI',
  //       contactno: x.contactNo,
  //       audit_user: x.data.audit_user,
  //       responddate: '04 Nov 2021 08:47',
  //       userfile: fileImg,

  //       // lotno: 'R27A',
  //       // audit_user: x.data.audit_user,
  //       // category_cd: 'EE01',
  //       // floor: x.floor,
  //       // reqtype: x.location_type,
  //       // workreq: 'Test API With Image',
  //       // reqby: 'Bayu Adhyatmaja',
  //       // contactNo: x.contactNo,
  //       // // filename: fileName,
  //       // userfile: fileImg,
  //       // // image: 'halo',
  //     };

  //     console.log('dataSaveAll', formData_pict);

  //     var photo = {
  //       uri: formData_pict.userfile,
  //       type: 'image/jpeg',
  //       name: 'photo.jpg',
  //     };
  //     console.log('dataPict', photo);

  //     dataSaveAll.push(formData_pict);

  //     const formData = new FormData();
  //     formData.append('email', formData_pict.email);
  //     formData.append('entity_cd', formData_pict.entity_cd);
  //     formData.append('project_no', formData_pict.project_no);
  //     formData.append('reportdate', formData_pict.reportdate);
  //     formData.append('takenby', formData_pict.takenby);
  //     formData.append('lotno', formData_pict.lotno),
  //       formData.append('category', formData_pict.category),
  //       formData.append('floor', formData_pict.floor),
  //       formData.append('location', formData_pict.location),
  //       formData.append('reqtype', formData_pict.reqtype),
  //       formData.append('workreq', formData_pict.workreq),
  //       formData.append('reqby', formData_pict.reqby),
  //       formData.append('contactno', formData_pict.contactno),
  //       formData.append('audit_user', formData_pict.audit_user),
  //       formData.append('responddate', formData_pict.reportdate),
  //       formData.append('userfile', formData_pict.userfile),
  //       // images.forEach((image, i) => {
  //       //   formData.append('userfile', {
  //       //     ...image,
  //       //     uri:
  //       //       Platform.OS === 'android'
  //       //         ? image.uri
  //       //         : image.uri.replace('file://', ''),
  //       //     name: `image-${i}`,
  //       //     type: 'image/jpeg',
  //       //   });
  //       // });

  //       console.log('dataSave', formData);

  //     await axios
  //       .post(
  //         'http://34.87.121.155:2121/apiwebpbi/api/csentry-saveTicketWithImage',

  //         formData,
  //         {
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         },
  //       ) //kalo untuk save form input pake nya 'data'
  //       .then(res => {
  //         console.log('res upload foto', res.data);
  //         console.log('res upload', res.data.Pesan); ///
  //         // return result.response.data;
  //         alert(res.Pesan);
  //       })
  //       .catch(error => {
  //         // console.log('err', error.res.data);
  //         alert('error nih', error);
  //       });
  //   });
  // };

  // const upload = () => {
  //   const passProps = passProp;
  //   const x = passProps;
  //   const prevProps = passPropStorage;
  //   console.log('data upload', x);
  //   const data = {
  //     email: email, //-email

  //     // report_no: dataTicketNo,
  //     entity_cd: x.entity_cd,
  //     project_no: x.project_no,
  //     // request_by: x.reportName,
  //     reportdate: '04 Nov 2021 08:47',
  //     takenby: 'RIKKI',
  //     lot_no: x.lot_no,
  //     audit_user: x.data.audit_user,
  //     category_cd: 'EE01',
  //     floor: x.floor,
  //     reqtype: x.location_type,
  //     workreq: 'Test API With Image',
  //     reqby: x.reqby,
  //     contactNo: x.contactNo,
  //     // filename: fileName,
  //     // userfile: fileImg,
  //   };
  //   let dataSaveAll = [];
  //   image.map(async (images, index) => {
  //     let fileName =
  //       x.reportName.replace(' ', '_') +
  //       '_' +
  //       moment(new Date()).format('MMDDYYYY') +
  //       '_ticket_' +
  //       (index + 1) +
  //       '.jpg';
  //     //   let fileImg = RNFetchBlob.wrap(images.uri.replace('file://', ''));
  //     let fileImg = RNFetchBlob.wrap(images.uri.replace('file:/', ''));
  //     console.log('fileimg', fileImg);

  //     // const file =  [...fileImg],

  //     const formData_pict = {
  //       // name: 'image',
  //       // data: data,
  //       email: email, //-email

  //       // report_no: dataTicketNo,
  //       entity_cd: x.entity_cd,
  //       project_no: x.project_no,
  //       // request_by: x.reportName,
  //       reportdate: '04 Nov 2021 08:47',
  //       takenby: 'MGR',
  //       debtoracct: '10180',
  //       lotno: 'R27A',
  //       category: 'EE01',
  //       floor: x.floor,
  //       location: '059',
  //       reqtype: 'U',
  //       workreq: 'Test API With Image',
  //       reqby: 'RIKI',
  //       contactno: x.contactNo,
  //       audit_user: x.data.audit_user,
  //       responddate: '04 Nov 2021 08:47',
  //       userfile: fileImg,

  //       // lotno: 'R27A',
  //       // audit_user: x.data.audit_user,
  //       // category_cd: 'EE01',
  //       // floor: x.floor,
  //       // reqtype: x.location_type,
  //       // workreq: 'Test API With Image',
  //       // reqby: 'Bayu Adhyatmaja',
  //       // contactNo: x.contactNo,
  //       // // filename: fileName,
  //       // userfile: fileImg,
  //       // // image: 'halo',
  //     };

  //     console.log('dataSaveAll', formData_pict);

  //     dataSaveAll.push(formData_pict);

  //     const formData = new FormData();
  //     formData.append('email', formData_pict.email);
  //     formData.append('entity_cd', formData_pict.entity_cd);
  //     formData.append('project_no', formData_pict.project_no);
  //     formData.append('reportdate', formData_pict.reportdate);
  //     formData.append('takenby', formData_pict.takenby);
  //     formData.append('lotno', formData_pict.lotno),
  //       formData.append('category', formData_pict.category),
  //       formData.append('floor', formData_pict.floor),
  //       formData.append('location', formData_pict.location),
  //       formData.append('reqtype', formData_pict.reqtype),
  //       formData.append('workreq', formData_pict.workreq),
  //       formData.append('reqby', formData_pict.reqby),
  //       formData.append('contactno', formData_pict.contactno),
  //       formData.append('audit_user', formData_pict.audit_user),
  //       formData.append('responddate', formData_pict.reportdate),
  //       formData.append('userfile', formData_pict.userfile),
  //       // formData.append('image', {
  //       //   uri: formData_pict.userfile,
  //       //   type: 'image/jpeg',
  //       //   mime: 'image/jpeg',
  //       //   name: formData_pict.userfile,
  //       // });

  //       console.log('dataSave', formData);
  //     RNFetchBlob.fetch(
  //       'POST',
  //       'http://34.87.121.155:2121/apiwebpbi/api/csentry-saveTicketWithImage',
  //       {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       [
  //         {
  //           name: 'userfile',
  //           filename: 'contsh.jpg',
  //           type: 'image/jpg',
  //           data: formData_pict.userfile,
  //         },

  //         {name: 'email', data: formData_pict.email},
  //         {name: 'entity_cd', data: formData_pict.entity_cd},
  //         {name: 'project_no', data: formData_pict.project_no},
  //         {name: 'reportdate', data: formData_pict.reportdate},
  //         {name: 'takenby', data: formData_pict.takenby},
  //         {name: 'lotno', data: formData_pict.lotno},
  //         {name: 'category', data: formData_pict.category},
  //         {name: 'floor', data: formData_pict.floor},
  //         {name: 'location', data: formData_pict.location},
  //         {name: 'reqtype', data: formData_pict.reqtype},

  //         {name: 'workreq', data: formData_pict.workreq},

  //         {name: 'reqby', data: formData_pict.reqby},

  //         {name: 'contactno', data: formData_pict.contactno},
  //         {name: 'audit_user', data: formData_pict.audit_user},

  //         {name: 'responddate', data: formData_pict.responddate},
  //       ],
  //     ).then(resp => {
  //       // console.log(resp.data);
  //       alert(resp.Pesan);
  //     });
  //   });
  // };

  const removePhoto = async key => {
    console.log('key remove', key);
    let imageArray = [...image];
    imageArray.splice(key, 1);
    setImage(imageArray);
    //    let imageArray = [...this.state.image];
    //    imageArray.splice(key, 1);
    //    this.setState({image: imageArray});
  };

  const onApply = () => {
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected) {
      setModalVisible(false);
      //   setSortOption(sortOptionInit);
    }
  };

  const onSelectFilter = selected => {
    console.log('selected filter', selected);
    // setSortOption(
    //   sortOption.map(item => {
    //     return {
    //       ...item,
    //       checked: item.value == selected.value,
    //     };
    //   }),
    // );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('category_help')} //belum dibuat lang
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {/* <Button onPress={() => modalBankMaster()}>
        <Text>choose location</Text>
      </Button> */}
      <TouchableOpacity onPress={() => modalBankMaster()}>
        <TextInput
          onChangeText={val => setTextLocation(val)}
          placeholder="Choose Location"
          editable={false}
          value={textLocation}></TextInput>
      </TouchableOpacity>

      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text
          style={{
            color: '#3f3b38',
            fontSize: 14,
            marginBottom: 0,
            paddingBottom: 0,
            marginTop: 0,
            paddingTop: 0,
          }}>
          Work Request
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          blurOnSubmit
          placeholder="Description"
          style={styles.textArea}
          onChangeText={text => setTextDescs(text)}
        />
      </View>
      <View style={styles.pickerWrap}>
        <Text>Attachment</Text>
        {image.length === 0 ? (
          <TouchableOpacity
            onPress={() => handlePhotoPick()}
            style={[styles.sel, {marginBottom: 20, alignSelf: 'center'}]}>
            <Text>Select a photo</Text>
          </TouchableOpacity>
        ) : (
          <View>
            {image.map((data, key) => (
              <TouchableOpacity
                key={key}
                style={styles.avatarContainer}
                onPress={() => console.log('Photo Tapped')}>
                <View>
                  <Image style={styles.avatar} source={image[key]} />

                  <Icon
                    onPress={() => removePhoto(key)}
                    name="times"
                    size={18}
                    // color="#5A110D"
                    color={colors.primary}
                    style={[styles.iconRemove, {marginLeft: 5}]}
                    enableRTL={true}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Button onPress={() => submitTicket()}>
        <Text>Submit</Text>
      </Button>
    </SafeAreaView>
  );
}
