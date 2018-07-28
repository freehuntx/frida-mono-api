let monoModule = Process.findModuleByName('mono.dll')

if (!monoModule) {
  const monoThreadAttach = Module.findExportByName(null, 'mono_thread_attach')
  if (monoThreadAttach) monoModule = Process.findModuleByAddress(monoThreadAttach)
}
if (!monoModule) throw new Error('Cant find mono!')

export default monoModule
