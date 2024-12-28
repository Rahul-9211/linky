import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinkForm from './LinkForm';

type AddLinkModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, url: string) => void;
};

const AddLinkModal = ({ visible, onClose, onSubmit }: AddLinkModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Link</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <LinkForm onSubmit={(name, url) => {
            onSubmit(name, url);
            onClose();
          }} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
});

export default AddLinkModal; 