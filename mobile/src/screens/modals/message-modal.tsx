import React , { useState, PropsWithChildren, ComponentProps, useContext, useMemo }  from "react";
import { Text, StyleSheet, View, ViewStyle, StyleProp, TouchableOpacity, Modal, TouchableHighlight, Alert, Platform  } from "react-native";
import { px } from "../../hooks/utils";

export const MessageModelContext = React.createContext<IGlobalModalState>({ 
  isOpen: false, 
  buttons: ["OK"]
});

export function useMessageBox() {
  const [state,setState] = useContext(GlobalMessageModalContext);
  return useMemo(() => {
    function showMessage(content: string | JSX.Element) : Promise<"OK" | undefined>;
    function showMessage<T extends Exclude<IGlobalModalState['buttons'], undefined>>(content: string | JSX.Element, buttons: T): Promise<T[number]>
    function showMessage(content: string | JSX.Element, buttons: IGlobalModalState['buttons'] = ["OK"])  {
      return new Promise<string | undefined>(resolve => {
        setState({ 
          isOpen: true, 
          content, 
          buttons,
          onClosed: (s?: "YES" | "NO" | "OK") => {
            resolve(s);
            setState({ isOpen: false });
          }
        })
      });
    }
    return {
      showMessage,
      hideMessage: () => {
        if(state.onClosed) {
          state.onClosed();
        }
        setState({ isOpen: false })
      } 
    }
  }, [state]);
}
export interface IGlobalModalState {
  content?: string | JSX.Element;
  isOpen: boolean;
  buttons?: ["YES"] | ["YES", "NO"] | ["OK"] | [];
  onClosed?: (r?: "YES" | "NO" | "OK" | undefined) => void
}
const GlobalMessageModalContext = React.createContext<[IGlobalModalState, React.Dispatch<IGlobalModalState>]>([{ isOpen: false, buttons:["OK"]}, ()=> {}]);
export function GlobalErrorModal(p: React.PropsWithChildren<{}>) {
  const [state, setState] = useState<IGlobalModalState>({ 
    isOpen: false, 
    buttons: ["OK"]
  });
  const contextValue = useMemo(() => [state, setState] as [IGlobalModalState, React.Dispatch<IGlobalModalState>], [state, setState])
  return <GlobalMessageModalContext.Provider value={contextValue}> 
    <MessageModal {...p} onRequestClose={state.onClosed!} visible={state.isOpen}
      buttons={state.buttons}>
      {typeof state.content === "string"? <Text style={{fontSize: px(14)}}>{state.content}</Text>: state.content}
    </MessageModal>
    <>
      {p.children}
    </>
  </GlobalMessageModalContext.Provider>;
}
export function MessageModal(p: PropsWithChildren<ComponentProps<typeof Modal>> & { 
  onRequestClose: (result?: "YES" | "NO" | "OK") => void,
  buttons: IGlobalModalState['buttons']
}) {
    const { children, buttons, ...rest } = p;
    const [b1, b2] = buttons || ["OK"];
    return <Modal
      animationType="slide"
      supportedOrientations = {['portrait', 'landscape']}
      transparent={true}
      {...rest}>
      <View style={[{alignSelf: 'center',
        top: "20%",
        width: '90%',
        borderRadius: 25,
        backgroundColor: "white",
        borderColor: "lightgray",
        borderWidth: 2,
         minHeight: 250, alignItems: "center", justifyContent: "center" }]}>
          {children}
          {b1 !== "OK" ? <></> :
            <TouchableOpacity onPress={() => p.onRequestClose("OK")}>
                <Text>OK</Text>
            </TouchableOpacity>
            }
          {!(b1 === "YES" && b2 === "NO") ? <></> :
            <View style={[{marginTop: px(5), flexDirection: 'row', alignItems: "stretch", justifyContent:"space-evenly"} ]}>
            <TouchableOpacity onPress={() => p.onRequestClose("OK")} style={[{margin: 25, alignSelf: "center", marginBottom:px(25) , width: px(122)}]}>
                <Text>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => p.onRequestClose("OK")} style={[{margin: 25, alignSelf: "center", marginBottom:px(25) , width: px(122)}]}>
                <Text>NO</Text>
            </TouchableOpacity>
            </View>}
      </View>
    </Modal>
}