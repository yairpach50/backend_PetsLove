// Importaciones de autenticación
import { UserRoutes } from "./authorization/User.route";
import { RoleRoutes } from "./authorization/Role.route";
import { RoleUserRoutes } from "./authorization/RoleUser.route";
import { RefreshTokenRoutes } from "./authorization/RefreshToken.route";
import { ResourceRoutes } from "./authorization/Resource.route";
import { ResourceRoleRoutes } from "./authorization/ResourceRole.route";

// Importaciones de modelos
import { AppointmentRoutes } from "./Appointment.route";
import { LaboratoryRoutes } from "./Laboratory.route";
import { MedicalHistoryRoutes } from "./MedicalHistory.route";
import { MedicineRoutes } from "./Medicine.route";
import { OwnerRoutes } from "./Owner.route";
import { PaymentRoutes } from "./Payment.route";
import { PetRoutes } from "./PetRoutes";
import { PrescriptionRoutes } from "./PrescriptionRoutes";
import { PrescriptionMedicineRoutes } from "./PrescriptionMedicineRoutes";
import { ProcedureRoutes } from "./ProcedureRoutes";
import { VaccineApplicationRoutes } from "./VaccineApplicationRoutes";
import { VaccineRoutes } from "./VaccineRoutes";
import { VeterinarianRoutes } from "./VeterinarianRoutes";

// Authorization
import { AuthRoutes } from "./authorization/auth";


export class Routes {
  // Rutas de autenticacion
  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes(); 
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes();

  // Rutas de modelos
  public appointmentRoutes: AppointmentRoutes = new AppointmentRoutes();
  public laboratoryRoutes: LaboratoryRoutes = new LaboratoryRoutes();
  public medicalhistoryRoutes: MedicalHistoryRoutes = new MedicalHistoryRoutes();
  public medicineRoutes: MedicineRoutes = new MedicineRoutes();
  public ownerRoutes: OwnerRoutes = new OwnerRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public petRoutes: PetRoutes = new PetRoutes();
  public prescriptionRoutes: PrescriptionRoutes = new PrescriptionRoutes();
  public prescriptionmedicineRoutes: PrescriptionMedicineRoutes = new PrescriptionMedicineRoutes();
  public procedureRoutes: ProcedureRoutes = new ProcedureRoutes();
  public vaccineapplicationRoutes: VaccineApplicationRoutes = new VaccineApplicationRoutes();
  public vaccineRoutes: VaccineRoutes = new VaccineRoutes();
  public veterinarianRoutes: VeterinarianRoutes = new VeterinarianRoutes();

  // Authorization
  public authRoutes: AuthRoutes = new AuthRoutes();
}
