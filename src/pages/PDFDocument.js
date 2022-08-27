
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image as PDFImage,
} from "@react-pdf/renderer";
import ws_special from '../assets/ws_special.png';
import no_ws_special from '../assets/no_ws.png';

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "#000",
        margin: 10,
        padding: 10
    },
    section: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 10,
        // padding: 10,

    },
    title: {
        fontSize: 12
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginHorizontal: 5
    },
    price: {
        fontSize: 20,
        // paddingLeft: 10,
        fontWeight: "extrabold",
    },
    logo_view: {
        display: "flex",
        // justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    }
});
const dateTime = `${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(Date.now())}`;

const Image = ({ src = '', propStyles = {} }) => {
    return (
        <PDFImage
            style={{ ...styles.image, ...propStyles }}
            src={src}
        />
    )
}

// Create Document Component
function BasicDocument({ title = 'test', price = '12', pageSize = 'A6', barcode = '' }) {

    return (
        <Document>
            {/*render a single page*/}
            <Page size={pageSize} style={styles.page} orientation="landscape" break={false}>
                <Text style={{ fontSize: 12 }}>{title}</Text>
                <View style={styles.section}>
                    <Text style={styles.price}>{price}</Text>
                    <View style={styles.logo_view}>
                        <Image src={ws_special} propStyles={{ with: 60, height: 60, borderRadius: 30 }} />
                        <Image src={no_ws_special} />
                    </View>
                </View>
                <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: "center", flexDirection: 'row', top: 10 }}>
                    <View>
                        <Text style={{ fontSize: 9 }}>{`${dateTime.split(',')[0]}`}</Text>
                        <Text style={{ paddingTop: 3, fontSize: 9 }}>{`${dateTime.split(',')[1]}`}</Text>
                    </View>
                    <PDFImage style={{ height: 45 }} src={barcode} />
                </View>
            </Page>
        </Document>
    );
}
export default BasicDocument;