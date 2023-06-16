import axiosClient from '~/api/axiosClient';

const url = `/activity`;

export interface CreateAssignmentPayload {
  name: string;
  activityTypeId: number;
  isVisible: boolean;
  classSectionId: number;
  description: string;
  startDate: string;
  endDate: string;
  editBeForSubmitMin: number;
  maxFileSubmit: number;
  maxFileSize: number;
  attachFiles: string[];
  isOverWriteAttachFile: boolean;
}
export interface UpdateAssignmentPayload {
  name: string;
  activityTypeId: number;
  isVisible: boolean;
  classSectionId: number;
  description: string;
  startDate: string;
  endDate: string;
  editBeForSubmitMin: number;
  maxFileSubmit: number;
  maxFileSize: number;
  attachFiles: string[];
  isOverWriteAttachFile: boolean;
}

const assignmentApi = {
  createAssignment(data: CreateAssignmentPayload): Promise<any> {
    const bodyFormData = new FormData();
    const {
      name,
      activityTypeId,
      isVisible,
      classSectionId,
      description,
      startDate,
      endDate,
      editBeForSubmitMin,
      maxFileSubmit,
      maxFileSize,
      attachFiles,
      isOverWriteAttachFile,
    } = data;
    attachFiles.forEach((item) => {
      bodyFormData.append('attachFiles', item);
    });
    bodyFormData.append('name', name as any); // CORRECT WAY
    bodyFormData.append('activityTypeId', activityTypeId as any); // CORRECT WAY
    bodyFormData.append('isVisible', isVisible as any); // CORRECT WAY
    bodyFormData.append('classSectionId', classSectionId as any); // CORRECT WAY
    bodyFormData.append('description', description as any); // CORRECT WAY
    bodyFormData.append('startDate', startDate as any); // CORRECT WAY
    bodyFormData.append('endDate', endDate as any); // CORRECT WAY
    bodyFormData.append('editBeForSubmitMin', editBeForSubmitMin as any); // CORRECT WAY
    bodyFormData.append('maxFileSubmit', maxFileSubmit as any); // CORRECT WAY
    bodyFormData.append('maxFileSize', maxFileSize as any); // CORRECT WAY
    bodyFormData.append('isOverWriteAttachFile', isOverWriteAttachFile as any); // CORRECT WAY

    return axiosClient.post(`${url}/assignment`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
export default assignmentApi;
