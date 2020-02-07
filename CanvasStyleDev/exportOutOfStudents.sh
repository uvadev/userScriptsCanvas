$OUpath = 'ou=Students,ou=CORP,dc=uview,dc=academy'
$ExportPath = 'c:\temp\users_in_ou1.csv'
Get-ADUser -Filter * -SearchBase $OUpath | Select-object
DistinguishedName,Name,UserPrincipalName | Export-Csv -NoType $ExportPath